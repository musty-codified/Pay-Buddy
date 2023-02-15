package com.decagon.dev.paybuddy.serviceImpl;

import com.decagon.dev.paybuddy.dtos.requests.EmailSenderDto;
import com.decagon.dev.paybuddy.dtos.requests.LoginUserRequest;
import com.decagon.dev.paybuddy.dtos.responses.LoginResponseDto;
import com.decagon.dev.paybuddy.enums.ResponseCodeEnum;
import com.decagon.dev.paybuddy.enums.Roles;
import com.decagon.dev.paybuddy.enums.WalletStatus;
import com.decagon.dev.paybuddy.models.Role;
import com.decagon.dev.paybuddy.models.User;
import com.decagon.dev.paybuddy.models.Wallet;
import com.decagon.dev.paybuddy.dtos.requests.CreateUserRequest;
import com.decagon.dev.paybuddy.repositories.RoleRepository;
import com.decagon.dev.paybuddy.repositories.UserRepository;
import com.decagon.dev.paybuddy.repositories.WalletRepository;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.security.CustomUserDetailService;
import com.decagon.dev.paybuddy.security.JwtUtils;
import com.decagon.dev.paybuddy.services.EmailService;
import com.decagon.dev.paybuddy.services.UserService;
import com.decagon.dev.paybuddy.utilities.AppUtil;
import com.decagon.dev.paybuddy.utilities.ResponseCodeUtil;
import com.decagon.dev.paybuddy.utilities.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtil;
    private final EmailService emailService;

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailService customUserDetailService;
    private final AppUtil appUtil;
    private final UserUtil userUtil;
    private final ResponseCodeUtil responseCodeUtil = new ResponseCodeUtil();
    private final WalletRepository walletRepository;
    private final RoleRepository roleRepository;

    @Override
    public BaseResponse signUp(CreateUserRequest createUserRequest){
        BaseResponse response = new BaseResponse();

        if (createUserRequest.getFirstName().trim().length() == 0 ||
                createUserRequest.getLastName().trim().length() == 0)
            return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.ERROR,
                    "First name cannot be empty.");

        if (!appUtil.validEmail(createUserRequest.getEmail()))
            return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.ERROR,
                    "Invalid email address.");

        if (createUserRequest.getPhoneNumber().trim().length() == 0)
            return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.ERROR,
                    "Last name cannot be empty.");

        if (createUserRequest.getBvn().trim().length() == 0)
            return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.ERROR,
                    "Bvn cannot be empty.");

        if (createUserRequest.getPassword().trim().length() == 0)
            return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.ERROR,
                    "Password cannot be empty.");

        Boolean isUserExist = userRepository.existsByEmail(createUserRequest.getEmail());

        if (isUserExist)
            return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.ERROR,
                    "User already exist.");

        User newUser = new User();
        newUser.setFirstName(createUserRequest.getFirstName());
        newUser.setLastName(createUserRequest.getLastName());
        newUser.setOtherName(createUserRequest.getOtherName());
        newUser.setEmail(createUserRequest.getEmail());
        newUser.setPhoneNumber(appUtil.getFormattedNumber(createUserRequest.getPhoneNumber()));
        newUser.setPassword(passwordEncoder.encode(createUserRequest.getPassword()));
        String token = jwtUtil.generateSignUpConfirmationToken(createUserRequest.getEmail());
        newUser.setConfirmationToken(token);
        userRepository.save(newUser);

        String URL = "http://localhost:8080/api/v1/auth/confirmRegistration?token=" + token;
        String link = "<h3>Hello "  + createUserRequest.getFirstName()  +
                "<br> Click the link below to activate your account <a href=" + URL + "><br>Activate</a></h3>";

        String subject = "Pay-Buddy Verification Code";

        EmailSenderDto emailSenderDto = new EmailSenderDto();
        emailSenderDto.setTo(createUserRequest.getEmail());
        emailSenderDto.setSubject(subject);
        emailSenderDto.setContent(link);
        emailService.sendMail(emailSenderDto);

        return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.SUCCESS,
                "You have successful registered. Check your email to verify your account");
    }
    @Override
    public BaseResponse confirmRegistration(String token) {
        BaseResponse response = new BaseResponse();
        Optional<User> existingUser = userRepository.findByConfirmationToken(token);
        if (existingUser.isPresent()) {

            existingUser.get().setRoles(getUserRoles(Collections.singleton(String.valueOf(Roles.ROLE_USER))));
            existingUser.get().setConfirmationToken(null);
            existingUser.get().setIsEmailVerified(true);
            userRepository.save(existingUser.get());

            Wallet wallet = new Wallet();
            wallet.setAccountNumber(appUtil.generateAccountNumber(existingUser.get().getUserId(), existingUser.get().getEmail()));
            wallet.setAccountBalance(BigDecimal.valueOf(0));
            wallet.setPin("0000");
            wallet.setUser(existingUser.get());
            wallet.setStatus(WalletStatus.LOCKED);
            walletRepository.save(wallet);

            return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.SUCCESS,
                    "Account verification successful");
        } else {
            return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.ERROR,
                    "User not found");
        }
    }
    private Collection<Role> getUserRoles(Collection<String> roleNames) {
        Collection<Role> roles = new HashSet<>();
        if (roleNames == null || roleNames.isEmpty()) {
            roles.add(roleRepository.findByName(Roles.ROLE_USER.name()));
            return roles;
        }
        for (String roleName : roleNames) {
            Role role = roleRepository.findByName(roleName);
            if (role != null) {
                roles.add(role);
            }
        }
        if (roles.size() == 0)
            roles.add(roleRepository.findByName(Roles.ROLE_USER.name()));


        if (roles.stream().anyMatch(role -> role.getName().equals(Roles.ROLE_SUPER_ADMIN.name())))
            throw new RuntimeException("ErrorMessages.ACCESS_DENIED.getErrorMessage()");
        return roles;
    }
    @Override
    public BaseResponse login(LoginUserRequest request) {
        BaseResponse response = new BaseResponse();

        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        UserDetails user = customUserDetailService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(user);

        User users = userRepository.findByEmail(user.getUsername()).orElseThrow(()
                -> new UsernameNotFoundException("Username Not Found"));

        LoginResponseDto responseDto = LoginResponseDto.builder()
                .firstName(users.getFirstName())
                .lastName(users.getLastName())
                .email(users.getEmail())
                .token(token)
                .build();

        return  responseCodeUtil.updateResponseDataReturnObject(new BaseResponse(ResponseCodeEnum.SUCCESS), ResponseCodeEnum.SUCCESS, responseDto);
    }

}