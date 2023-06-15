package com.auth.auth.DTOs;



import org.springframework.stereotype.Component;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JwtClaimsModel {

    private String email;
    private String roles;
    private String pictureUrl;

}
