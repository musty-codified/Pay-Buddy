package com.decagon.dev.paybuddy.dtos.responses.vtpass.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BuyAirtimeRequest {
    private String request_id;
    private String serviceID;
    private BigDecimal amount;
    private String phone;
    private String pin;
}
