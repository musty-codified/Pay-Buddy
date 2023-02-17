package com.decagon.dev.paybuddy.utilities;

import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Ikechi Ucheagwu
 * @created 17/02/2023 - 16:59
 * @project Pay-Buddy
 */

@Data
@Builder
public class ErrorResponse {
    private int httpStatusCode;
    private List<Object> message;
    private LocalDateTime responseDate;
}
