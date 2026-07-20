package br.com.daniel.contenthub.mapper;

import java.util.List;

import br.com.daniel.contenthub.dto.EventoDTO;
import br.com.daniel.contenthub.model.Evento;

public class EventoMapper {

    public static EventoDTO toDTO(Evento evento) {

        if (evento == null) {
            return null;
        }

        Long ministerioId = null;
        String ministerioNome = null;

        if (evento.getMinisterio() != null) {
            ministerioId = evento.getMinisterio().getId();
            ministerioNome = evento.getMinisterio().getNome();
        }

        return new EventoDTO(
                evento.getId(),
                evento.getTitulo(),
                evento.getDescricao(),
                evento.getData(),
                evento.getImagem(),
                ministerioId,
                ministerioNome
        );
    }

    public static List<EventoDTO> toDTOList(List<Evento> eventos) {
        return eventos.stream()
                .map(EventoMapper::toDTO)
                .toList();
    }
}