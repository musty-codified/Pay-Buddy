//package com.decagon.dev.paybuddy.Controllers;
//
//import com.decagon.dev.paybuddy.dtos.requests.CreateUserRequest;
//import com.decagon.dev.paybuddy.enums.Roles;
//import com.decagon.dev.paybuddy.models.Role;
//import com.decagon.dev.paybuddy.models.User;
//import com.decagon.dev.paybuddy.repositories.RoleRepository;
//import com.decagon.dev.paybuddy.repositories.UserRepository;
//import com.decagon.dev.paybuddy.security.CustomUserDetailService;
//import com.decagon.dev.paybuddy.security.JwtUtils;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Collection;
//import java.util.HashSet;
//import java.util.Optional;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("api/v1/auth")
//public class AuthController {
//
//    private final CustomUserDetailService customUserDetailService;
//
//    private final JwtUtils jwtUtils;
//
//   private final AuthenticationManager authenticationManager;
//   private final RoleRepository roleRepository;
//
//    @PostMapping("/login")
//    public ResponseEntity<String> userLogin(@RequestBody User user) {
//        authenticationManager
//                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
//        final UserDetails userDetails = customUserDetailService.loadUserByUsername(user.getEmail());
//        if (userDetails != null) {
//            String token = jwtUtils.generateToken(userDetails);
//            return ResponseEntity.ok(token);
//        }
//        return ResponseEntity.status(404).body("User does not exist");
//    }
//
//
//
//
//
//}
