package com.decagon.dev.paybuddy.services.vtpass.impl;

import com.decagon.dev.paybuddy.dtos.responses.vtpass.request.BuyDataPlanRequest;
import com.decagon.dev.paybuddy.dtos.responses.vtpass.response.data.*;
import com.decagon.dev.paybuddy.services.vtpass.VTPassService;
import com.decagon.dev.paybuddy.utilities.AppUtil;
import com.decagon.dev.paybuddy.utilities.VTPassConstants;
import com.decagon.dev.paybuddy.utilities.VTPassHttpEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

/**
 * @author Ikechi Ucheagwu
 * @created 09/03/2023 - 01:54
 * @project Pay-Buddy
 */

@ExtendWith(MockitoExtension.class)
class VTPassServiceImplTest {

    private VTPassService vtPassService;

    @Mock
    private VTPassHttpEntity<? super  Object> vtPassHttpEntity;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private AppUtil util;

    @BeforeEach
    public void init() {
        vtPassService = new VTPassServiceImpl(vtPassHttpEntity, restTemplate, util);
    }

    @Test
    void getDataServices() {
        DataServices dataServices = DataServices.builder()
                .serviceID("mtn-data")
                .name("MTN")
                .image("htpp://anexample.com/image")
                .build();

        DataServicesResponse dataServicesResponse = DataServicesResponse.builder()
                .response_description("0000")
                .content(new ArrayList<>(Collections.singletonList(dataServices)))
                .build();

        when(restTemplate.exchange(
                VTPassConstants.ALL_DATA_SERVICES,
                HttpMethod.GET,
                vtPassHttpEntity.getEntity(null),
                DataServicesResponse.class
        )).thenReturn(new ResponseEntity<>(dataServicesResponse, HttpStatus.OK));

        DataServicesResponse response = vtPassService.getDataServices();
        assertEquals(dataServicesResponse, response);
    }

    @Test
    void getDataPlans() {
        Varation varation = Varation.builder()
                .variation_code("mtn-10mb-100")
                .name("N100 100MB - 24 hrs")
                .variation_amount("100.00")
                .fixedPrice("Yes")
                .build();

        Content content = Content.builder()
                .ServiceName("MTN Data")
                .serviceID("mtn-data")
                .convinience_fee("0 %")
                .varations(new ArrayList<>(Collections.singletonList(varation)))
                .build();

        DataPlansResponse dataPlansResponse = DataPlansResponse.builder()
                .response_description("0000")
                .content(content)
                .build();

        when(restTemplate.exchange(
                VTPassConstants.NETWORK_DATA_PLANS + "mtn-data",
                HttpMethod.GET,
                vtPassHttpEntity.getEntity(null),
                DataPlansResponse.class
        )).thenReturn(new ResponseEntity<>(dataPlansResponse, HttpStatus.OK));

        DataPlansResponse response = vtPassService.getDataPlans("mtn-data");
        assertEquals(dataPlansResponse, response);
    }

    @Test
    void payDataPlan() {
        BuyDataPlanRequest request = BuyDataPlanRequest.builder()
                .request_id("202303090250D12985346")
                .serviceID("mtn-data")
                .variation_code("mtn-10mb-100")
                .amount(new BigDecimal("100.00"))
                .phone("08011111111")
                .build();

        BuyDataPlanResponse buyDataPlanResponse = BuyDataPlanResponse.builder()
                .code("0000")
                .response_description("TRANSACTION SUCCESSFUL")
                .requestId("3476we129909djd")
                .amount("100.00")
                .purchasedCode("")
                .build();

        when(restTemplate.exchange(
                VTPassConstants.PAY_DATA,
                HttpMethod.POST,
                vtPassHttpEntity.getEntity(null),
                BuyDataPlanResponse.class
        )).thenReturn(new ResponseEntity<>(buyDataPlanResponse, HttpStatus.OK));

        BuyDataPlanResponse response = vtPassService.payDataPlan(request);
        assertEquals(buyDataPlanResponse, response);
    }
}