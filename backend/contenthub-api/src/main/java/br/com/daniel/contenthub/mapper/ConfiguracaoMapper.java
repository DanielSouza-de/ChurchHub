package br.com.daniel.contenthub.mapper;

import br.com.daniel.contenthub.dto.ConfiguracaoDTO;
import br.com.daniel.contenthub.model.Configuracao;

public class ConfiguracaoMapper {

    public static ConfiguracaoDTO toDTO(
            Configuracao configuracao) {

        if (configuracao == null) {
            return null;
        }

        return new ConfiguracaoDTO(
                configuracao.getId(),
                configuracao.getNomeIgreja(),
                configuracao.getSlogan(),
                configuracao.getNomePastor(),
                configuracao.getFotoPastor(),
                configuracao.getTextoApresentacao(),
                configuracao.getEndereco(),
                configuracao.getTelefone(),
                configuracao.getWhatsapp(),
                configuracao.getEmail(),
                configuracao.getInstagram(),
                configuracao.getFacebook(),
                configuracao.getYoutube(),
                configuracao.getLogo(),
                configuracao.getBanner()
        );
    }
}