package br.com.daniel.contenthub.mapper;

import java.util.List;
import java.util.stream.Collectors;

import br.com.daniel.contenthub.dto.MinisterioDTO;
import br.com.daniel.contenthub.model.Ministerio;

public class MinisterioMapper {

    public static MinisterioDTO toDTO(Ministerio ministerio) {

        if (ministerio == null) {
            return null;
        }

        return new MinisterioDTO(
                ministerio.getId(),
                ministerio.getNome(),
                ministerio.getDescricao(),
                ministerio.getLider()
        );
    }

    public static List<MinisterioDTO> toDTOList(List<Ministerio> ministerios) {

        return ministerios.stream()
                .map(MinisterioMapper::toDTO)
                .collect(Collectors.toList());

    }
}