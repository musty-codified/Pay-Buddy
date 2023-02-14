package com.decagon.dev.paybuddy.exceptions;


import com.decagon.dev.paybuddy.enums.ResponseCodeEnum;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.utilities.ResponseCodeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice
public class GlobalExceptionHandler extends RuntimeException{

    @ExceptionHandler(UsernameNotFoundException.class)
    public BaseResponse UserNotFoundException (UsernameNotFoundException usernameNotFoundException){

        BaseResponse response = new BaseResponse();

        ResponseCodeUtil responseCodeUtil = new ResponseCodeUtil();
        return responseCodeUtil.updateResponseData(response, ResponseCodeEnum.USER_NOT_FOUND, usernameNotFoundException.getMessage());
    }
}
