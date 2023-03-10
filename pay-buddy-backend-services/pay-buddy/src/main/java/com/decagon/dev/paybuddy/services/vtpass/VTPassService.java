package com.decagon.dev.paybuddy.services.vtpass;

import com.decagon.dev.paybuddy.dtos.responses.vtpass.request.BuyAirtimeRequest;
import com.decagon.dev.paybuddy.dtos.responses.vtpass.request.BuyDataPlanRequest;
import com.decagon.dev.paybuddy.dtos.responses.vtpass.response.data.*;

/**
 * @author Ikechi Ucheagwu
 * @created 08/03/2023 - 19:28
 * @project Pay-Buddy
 */

public interface VTPassService {
    DataServicesResponse getDataServices();
    DataPlansResponse getDataPlans(String dataType);
    BuyDataPlanResponse payDataPlan(BuyDataPlanRequest request);
    BuyAirtimeResponse buyAirtime(BuyAirtimeRequest buyAirtimeRequest);

    AirtimeServiceResponse getAirtimeServices();
}
