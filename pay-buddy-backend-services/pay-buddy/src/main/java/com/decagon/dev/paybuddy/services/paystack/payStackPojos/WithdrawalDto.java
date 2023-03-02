package com.decagon.dev.paybuddy.services.paystack.payStackPojos;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class WithdrawalDto {
    private String account_number;
    private String account_name;
    private int bank_id;
    private String bank_code;
    private String recipient_code;
    private String reference;
}
