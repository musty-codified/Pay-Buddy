package com.decagon.dev.paybuddy.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Service {

    @Id
    private Long serviceId;
    private String serviceName;
    private String trackingNumber;
    private Boolean isAvailable;
}
