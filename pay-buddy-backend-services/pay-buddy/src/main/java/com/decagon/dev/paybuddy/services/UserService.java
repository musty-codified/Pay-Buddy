package com.decagon.dev.paybuddy.services;

import com.decagon.dev.paybuddy.dtos.requests.CreateUserRequest;
import com.decagon.dev.paybuddy.dtos.requests.LoginUserRequest;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;

public interface UserService {

    BaseResponse signUp(CreateUserRequest createUserRequest);
    BaseResponse confirmRegistration(String confirmationToken);

    BaseResponse login(LoginUserRequest request);
}
