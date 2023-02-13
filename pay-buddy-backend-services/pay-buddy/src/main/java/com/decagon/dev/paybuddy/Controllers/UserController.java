package com.decagon.dev.paybuddy.Controllers;

import com.decagon.dev.paybuddy.dtos.requests.CreateUserRequest;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/v1/auth")
@AllArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public BaseResponse createUser(@RequestBody CreateUserRequest createUserRequest){
        return userService.signUp(createUserRequest);
    }
    @GetMapping("/confirmRegistration")
    public BaseResponse confirmRegistration(@RequestParam (name = "token") String token) {
        return userService.confirmRegistration(token);

    }

}
