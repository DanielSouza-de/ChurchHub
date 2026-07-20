package br.com.daniel.contenthub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.daniel.contenthub.dto.EventoDTO;
import br.com.daniel.contenthub.exception.RecursoNaoEncontradoException;
import br.com.daniel.contenthub.mapper.EventoMapper;
import br.com.daniel.contenthub.model.Evento;
import br.com.daniel.contenthub.repository.EventoRepository;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    // Lista todos os eventos
    public List<EventoDTO> listarEventos() {
        return eventoRepository.findAll()
                .stream()
                .map(EventoMapper::toDTO)
                .toList();
    }

    // Busca por ID
    public Evento buscarPorId(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Evento com ID " + id + " não encontrado."
                        )
                );
    }

    // Busca DTO por ID
    public EventoDTO buscarDTOPorId(Long id) {
        return EventoMapper.toDTO(buscarPorId(id));
    }

    // Adiciona evento
    public Evento adicionarEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    // Atualiza evento
    public Evento atualizarEvento(Long id, Evento eventoAtualizado) {

        Evento evento = buscarPorId(id);

        evento.setTitulo(eventoAtualizado.getTitulo());
        evento.setDescricao(eventoAtualizado.getDescricao());
        evento.setData(eventoAtualizado.getData());
        evento.setImagem(eventoAtualizado.getImagem());
        evento.setMinisterio(eventoAtualizado.getMinisterio());

        return eventoRepository.save(evento);
    }

    // Remove evento
    public void removerEvento(Long id) {

        Evento evento = buscarPorId(id);

        eventoRepository.delete(evento);
    }

    // Busca por título
    public List<EventoDTO> buscarPorTitulo(String titulo) {
        return EventoMapper.toDTOList(
                eventoRepository.findByTituloContainingIgnoreCase(titulo)
        );
    }

    // Busca por descrição
    public List<EventoDTO> buscarPorDescricao(String descricao) {
        return EventoMapper.toDTOList(
                eventoRepository.findByDescricaoContainingIgnoreCase(descricao)
        );
    }

    // Busca por data
    public List<EventoDTO> buscarPorData(String data) {
        return EventoMapper.toDTOList(
                eventoRepository.findByData(data)
        );
    }

    // Ordenação
    public List<EventoDTO> listarOrdenadoPorTitulo() {
        return EventoMapper.toDTOList(
                eventoRepository.findAll(Sort.by("titulo"))
        );
    }

    // Paginação usando Pageable
    public Page<EventoDTO> listarPaginado(Pageable pageable) {
        return eventoRepository.findAll(pageable)
                .map(EventoMapper::toDTO);
    }

    // Paginação usando página e tamanho
    public Page<EventoDTO> listarEventosPaginados(int pagina, int tamanho) {

        Pageable pageable = PageRequest.of(pagina, tamanho);

        return eventoRepository.findAll(pageable)
                .map(EventoMapper::toDTO);
    }

    // Filtro
    public List<EventoDTO> filtrarEventos(String titulo, String descricao) {

        if (titulo != null && !titulo.isBlank()) {
            return EventoMapper.toDTOList(
                    eventoRepository.findByTituloContainingIgnoreCase(titulo)
            );
        }

        if (descricao != null && !descricao.isBlank()) {
            return EventoMapper.toDTOList(
                    eventoRepository.findByDescricaoContainingIgnoreCase(descricao)
            );
        }

        return EventoMapper.toDTOList(
                eventoRepository.findAll()
        );
    }
}