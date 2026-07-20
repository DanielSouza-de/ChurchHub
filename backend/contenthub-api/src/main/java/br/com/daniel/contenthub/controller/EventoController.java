package br.com.daniel.contenthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.daniel.contenthub.dto.EventoDTO;
import br.com.daniel.contenthub.model.Evento;
import br.com.daniel.contenthub.service.EventoService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Operation(summary = "Lista todos os eventos cadastrados")
    @GetMapping
    public List<EventoDTO> listarEventos() {

        return eventoService.listarEventos();

    }

    @Operation(summary = "Busca um evento pelo ID")
    @GetMapping("/{id}")
    public ResponseEntity<EventoDTO> buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok(
                eventoService.buscarDTOPorId(id)
        );

    }

    @Operation(summary = "Cadastra um novo evento")
    @PostMapping
    public ResponseEntity<Evento> adicionarEvento(
            @Valid @RequestBody Evento evento) {

        return ResponseEntity.ok(
                eventoService.adicionarEvento(evento)
        );

    }

    @Operation(summary = "Atualiza um evento existente")
    @PutMapping("/{id}")
    public ResponseEntity<Evento> atualizarEvento(
            @PathVariable Long id,
            @RequestBody Evento evento) {

        return ResponseEntity.ok(
                eventoService.atualizarEvento(id, evento)
        );

    }

    @Operation(summary = "Remove um evento")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerEvento(@PathVariable Long id) {

        eventoService.removerEvento(id);

        return ResponseEntity.ok("Evento removido com sucesso!");

    }

    @Operation(summary = "Busca eventos pelo título")
    @GetMapping("/titulo/{titulo}")
    public List<EventoDTO> buscarPorTitulo(@PathVariable String titulo) {

        return eventoService.buscarPorTitulo(titulo);

    }

    @Operation(summary = "Busca eventos pela descrição")
    @GetMapping("/descricao/{descricao}")
    public List<EventoDTO> buscarPorDescricao(@PathVariable String descricao) {

        return eventoService.buscarPorDescricao(descricao);

    }

    @Operation(summary = "Busca eventos pela data")
    @GetMapping("/data/{data}")
    public List<EventoDTO> buscarPorData(@PathVariable String data) {

        return eventoService.buscarPorData(data);

    }

    @Operation(summary = "Lista os eventos ordenados por título")
    @GetMapping("/ordenado/titulo")
    public List<EventoDTO> listarOrdenadoTitulo() {

        return eventoService.listarOrdenadoPorTitulo();

    }

    @Operation(summary = "Lista eventos utilizando paginação")
    @GetMapping("/pagina")
    public Page<EventoDTO> listarPaginado(

            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "5") int tamanho) {

        return eventoService.listarEventosPaginados(pagina, tamanho);

    }

    @Operation(summary = "Filtra eventos por título ou descrição")
    @GetMapping("/filtro")
    public List<EventoDTO> filtrarEventos(

            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String descricao) {

        return eventoService.filtrarEventos(titulo, descricao);

    }

}