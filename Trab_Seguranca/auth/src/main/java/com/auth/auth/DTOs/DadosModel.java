package com.auth.auth.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DadosModel {
    private String secret;
    private String otp;

    public DadosModel(String secret) {
        this.secret = secret;
    }

}
