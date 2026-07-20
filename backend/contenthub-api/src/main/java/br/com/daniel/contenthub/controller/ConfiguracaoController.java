package br.com.daniel.contenthub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.daniel.contenthub.dto.ConfiguracaoDTO;
import br.com.daniel.contenthub.model.Configuracao;
import br.com.daniel.contenthub.service.ConfiguracaoService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/configuracoes")
public class ConfiguracaoController {

    @Autowired
    private ConfiguracaoService configuracaoService;

    @Operation(
            summary = "Retorna as configurações públicas do site"
    )
    @GetMapping
    public ResponseEntity<ConfiguracaoDTO>
            buscarConfiguracao() {

        return ResponseEntity.ok(
                configuracaoService.buscarConfiguracao()
        );
    }

    @Operation(
            summary = "Atualiza as configurações do site"
    )
    @PutMapping
    public ResponseEntity<Configuracao>
            atualizarConfiguracao(
                    @Valid @RequestBody
                    Configuracao configuracao) {

        return ResponseEntity.ok(
                configuracaoService
                        .atualizarConfiguracao(configuracao)
        );
    }
}