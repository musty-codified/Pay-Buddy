package com.decagon.dev.paybuddy.dtos.responses;


import com.decagon.dev.paybuddy.dtos.requests.TransactionRequest;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class TransactionResponse extends BaseResponse {
    private List<TransactionRequest> transactionResponseList;
}
