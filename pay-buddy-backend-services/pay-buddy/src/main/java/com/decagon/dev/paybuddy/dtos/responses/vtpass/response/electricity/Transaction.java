package com.decagon.dev.paybuddy.dtos.responses.vtpass.response.electricity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Transaction {

    private String status;
    private String product_name;
    private String unique_element;
    private String unit_price;
    private String quantity;
    private String service_verification;
    private String channel;
    private String commission;
    private String total_amount;
    private String discount;
    private String type;
    private String email;
    private String phone;
    private String name;
    private String convinience_fee;
    private String amount;
    private String platform;
    private String method;
    private String transactionId;

}
