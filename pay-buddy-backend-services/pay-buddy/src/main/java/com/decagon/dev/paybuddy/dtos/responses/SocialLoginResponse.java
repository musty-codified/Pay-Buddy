package com.decagon.dev.paybuddy.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Data
public class SocialLoginResponse {
    private String jwtToken;
}
