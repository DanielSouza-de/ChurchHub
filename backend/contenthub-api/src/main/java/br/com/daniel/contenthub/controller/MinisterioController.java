package br.com.daniel.contenthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.daniel.contenthub.dto.MinisterioDTO;
import br.com.daniel.contenthub.model.Ministerio;
import br.com.daniel.contenthub.service.MinisterioService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/ministerios")
public class MinisterioController {

    @Autowired
    private MinisterioService ministerioService;

    @Operation(summary = "Lista todos os ministérios")
    @GetMapping
    public List<MinisterioDTO> listarMinisterios() {

        return ministerioService.listarMinisterios();

    }

    @Operation(summary = "Busca um ministério pelo ID")
    @GetMapping("/{id}")
    public ResponseEntity<MinisterioDTO> buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok(
                ministerioService.buscarDTOPorId(id)
        );

    }

    @Operation(summary = "Cadastra um novo ministério")
    @PostMapping
    public ResponseEntity<Ministerio> adicionarMinisterio(
            @Valid @RequestBody Ministerio ministerio) {

        return ResponseEntity.ok(
                ministerioService.adicionarMinisterio(ministerio)
        );

    }

    @Operation(summary = "Atualiza um ministério")
    @PutMapping("/{id}")
    public ResponseEntity<Ministerio> atualizarMinisterio(
            @PathVariable Long id,
            @RequestBody Ministerio ministerio) {

        return ResponseEntity.ok(
                ministerioService.atualizarMinisterio(id, ministerio)
        );

    }

    @Operation(summary = "Remove um ministério")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerMinisterio(
            @PathVariable Long id) {

        ministerioService.removerMinisterio(id);

        return ResponseEntity.ok("Ministério removido com sucesso!");

    }

    @Operation(summary = "Busca ministérios pelo nome")
    @GetMapping("/nome/{nome}")
    public List<MinisterioDTO> buscarPorNome(
            @PathVariable String nome) {

        return ministerioService.buscarPorNome(nome);

    }

    @Operation(summary = "Busca ministérios pelo líder")
    @GetMapping("/lider/{lider}")
    public List<MinisterioDTO> buscarPorLider(
            @PathVariable String lider) {

        return ministerioService.buscarPorLider(lider);

    }

}