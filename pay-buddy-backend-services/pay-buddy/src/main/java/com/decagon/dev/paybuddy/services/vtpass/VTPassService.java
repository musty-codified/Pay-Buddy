package com.decagon.dev.paybuddy.services.vtpass;

import com.decagon.dev.paybuddy.dtos.responses.vtpass.request.BuyDataPlanRequest;
import com.decagon.dev.paybuddy.dtos.responses.vtpass.response.data.BuyDataPlanResponse;
import com.decagon.dev.paybuddy.dtos.responses.vtpass.response.data.DataPlansResponse;
import com.decagon.dev.paybuddy.dtos.responses.vtpass.response.data.DataServicesResponse;

/**
 * @author Ikechi Ucheagwu
 * @created 08/03/2023 - 19:28
 * @project Pay-Buddy
 */

public interface VTPassService {
    DataServicesResponse getDataServices();
    DataPlansResponse getDataPlans(String dataType);
    BuyDataPlanResponse payDataPlan(BuyDataPlanRequest request);
}
