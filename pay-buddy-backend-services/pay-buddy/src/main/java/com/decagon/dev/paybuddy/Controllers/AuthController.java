package com.decagon.dev.paybuddy.Controllers;

import com.decagon.dev.paybuddy.dtos.requests.LoginUserRequest;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.services.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;
    @PostMapping("/login")
    public BaseResponse login(@RequestBody LoginUserRequest request) {
        return userService.login(request);
    }
}
