package com.decagon.dev.paybuddy.services;

import com.decagon.dev.paybuddy.dtos.requests.*;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {

    BaseResponse signUp(CreateUserRequest createUserRequest);
    BaseResponse confirmRegistration(String confirmationToken);

    BaseResponse login(LoginUserRequest request);

    BaseResponse  forgotPasswordRequest(ForgetPasswordRequest forgotPasswordRequest);

    BaseResponse resetPassword(ResetPasswordRequest request, String token);

//    BaseResponse verifyToken(VerifyTokenRequest verifyTokenRequest);

}

