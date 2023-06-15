package com.auth.auth.controllers;

import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.WebUtils;

import com.auth.auth.DTOs.DadosModel;
import com.auth.auth.DTOs.EmailModel;
import com.auth.auth.DTOs.JwtClaimsModel;
import com.auth.auth.models.ProductModel;
import com.auth.auth.repositorys.ProductRepository;
import com.auth.auth.repositorys.ProductRepositoryInjectionTest;
import com.auth.auth.responses.UserResponse;
import com.auth.auth.services.JWTService;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class UserController {
    @Autowired
    UserResponse ur;

    @Autowired
    RabbitTemplate rabbitTemplate;
    @Autowired
    JWTService jwtService;

    @Autowired
    ProductRepository pr;

    @Autowired
    ProductRepositoryInjectionTest prI;

    @GetMapping("/")
    public ResponseEntity<String> inicio() {
        return ResponseEntity.ok("bem vindo a api");
    }

    @GetMapping("/getValuesJWT")
    public ResponseEntity<JwtClaimsModel> valuesJWT(HttpServletRequest httpServletRequest) {
        Cookie cookie = WebUtils.getCookie(httpServletRequest, "jwt");
        String jwt = cookie.getValue().toString();
        JwtClaimsModel userModel = jwtService.jwtGetValues(jwt);
        return ResponseEntity.ok().body(userModel);

    }

    @PostMapping("/gerarOTP")
    public String chamarAPI(@RequestBody DadosModel dados) {

        String apiUrl = "http://localhost:3000/otp/generate"; // Substitua pela URL correta da sua API Node.js

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<DadosModel> requestEntity = new HttpEntity<>(dados, headers);

        RestTemplate restTemplate = new RestTemplate();

        String response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class).getBody();

        return response;
    }

    @GetMapping("/pegarProdutoPeloNome")

    public List<ProductModel> pegarUsuarioPeloNome(@RequestBody String nome) {

        return prI.findProductsByName(nome);

    }

    @PostMapping("/validarOTP")
    public String validarOTP(@RequestBody DadosModel dados) {

        String apiUrl = "http://localhost:3000/otp/validate";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<DadosModel> requestEntity = new HttpEntity<>(dados, headers);

        RestTemplate restTemplate = new RestTemplate();

        String response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class).getBody();

        return response;
    }

    @GetMapping("/loginGoogle")
    public ResponseEntity<JwtClaimsModel> loginGoogle(HttpServletRequest httpServletRequest) {
        ur.setMensagem("logado com google");

        String jwt = (String) httpServletRequest.getAttribute("jwtR");
        JwtClaimsModel userModel = jwtService.jwtGetValues(jwt);

        return new ResponseEntity<JwtClaimsModel>(userModel, HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<JwtClaimsModel> login(@AuthenticationPrincipal User user,
            HttpServletRequest httpServletRequest) {
        ur.setMensagem(user.getUsername());

        String jwt = httpServletRequest.getAttribute("jwtR").toString();
        JwtClaimsModel userModel = jwtService.jwtGetValues(jwt);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        EmailModel email = new EmailModel("projetointegracao45607@gmail.com", auth.getName(), "projeto",
                "Parabens! voce fez o login");
        String routingKey = "orders.v1.user-logged";
        rabbitTemplate.convertAndSend(routingKey, email);
        return new ResponseEntity<JwtClaimsModel>(userModel, HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity<UserResponse> admin() {
        ur.setMensagem("bem vindo admini");
        return new ResponseEntity<UserResponse>(ur, HttpStatus.OK);
    }

    @GetMapping("/user")
    public String user() {
        return "bem vindo user";
    }

}
