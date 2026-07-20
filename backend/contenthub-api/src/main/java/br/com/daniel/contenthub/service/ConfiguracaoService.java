package br.com.daniel.contenthub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.daniel.contenthub.dto.ConfiguracaoDTO;
import br.com.daniel.contenthub.mapper.ConfiguracaoMapper;
import br.com.daniel.contenthub.model.Configuracao;
import br.com.daniel.contenthub.repository.ConfiguracaoRepository;

@Service
public class ConfiguracaoService {

    @Autowired
    private ConfiguracaoRepository configuracaoRepository;

    public ConfiguracaoDTO buscarConfiguracao() {

        Configuracao configuracao =
                configuracaoRepository.findAll()
                        .stream()
                        .findFirst()
                        .orElseGet(this::criarConfiguracaoPadrao);

        return ConfiguracaoMapper.toDTO(configuracao);
    }

    public Configuracao atualizarConfiguracao(
            Configuracao configuracaoAtualizada) {

        Configuracao configuracao =
                configuracaoRepository.findAll()
                        .stream()
                        .findFirst()
                        .orElseGet(Configuracao::new);

        configuracao.setNomeIgreja(
                configuracaoAtualizada.getNomeIgreja()
        );

        configuracao.setSlogan(
                configuracaoAtualizada.getSlogan()
        );

        configuracao.setNomePastor(
                configuracaoAtualizada.getNomePastor()
        );

        configuracao.setFotoPastor(
                configuracaoAtualizada.getFotoPastor()
        );

        configuracao.setTextoApresentacao(
                configuracaoAtualizada.getTextoApresentacao()
        );

        configuracao.setEndereco(
                configuracaoAtualizada.getEndereco()
        );

        configuracao.setTelefone(
                configuracaoAtualizada.getTelefone()
        );

        configuracao.setWhatsapp(
                configuracaoAtualizada.getWhatsapp()
        );

        configuracao.setEmail(
                configuracaoAtualizada.getEmail()
        );

        configuracao.setInstagram(
                configuracaoAtualizada.getInstagram()
        );

        configuracao.setFacebook(
                configuracaoAtualizada.getFacebook()
        );

        configuracao.setYoutube(
                configuracaoAtualizada.getYoutube()
        );

        configuracao.setLogo(
                configuracaoAtualizada.getLogo()
        );

        configuracao.setBanner(
                configuracaoAtualizada.getBanner()
        );

        return configuracaoRepository.save(configuracao);
    }

    private Configuracao criarConfiguracaoPadrao() {

        Configuracao configuracao = new Configuracao();

        configuracao.setNomeIgreja("Nome da Igreja");

        configuracao.setSlogan(
                "Uma comunidade para acolher, servir e transformar vidas."
        );

        configuracao.setNomePastor("Nome do Pastor");

        configuracao.setFotoPastor(
                "https://placehold.co/600x800?text=Foto+do+Pastor"
        );

        configuracao.setTextoApresentacao(
                "Escreva aqui uma apresentação da igreja, sua missão, seus valores e a mensagem que deseja transmitir aos visitantes."
        );

        configuracao.setEndereco("Endereço da igreja");
        configuracao.setTelefone("");
        configuracao.setWhatsapp("");
        configuracao.setEmail("");
        configuracao.setInstagram("");
        configuracao.setFacebook("");
        configuracao.setYoutube("");

        configuracao.setLogo(
                "https://placehold.co/300x300?text=Logo"
        );

        configuracao.setBanner(
                "https://placehold.co/1920x1080?text=Banner"
        );

        return configuracaoRepository.save(configuracao);
    }
}