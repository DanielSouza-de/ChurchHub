package br.com.daniel.contenthub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.daniel.contenthub.dto.MinisterioDTO;
import br.com.daniel.contenthub.exception.RecursoNaoEncontradoException;
import br.com.daniel.contenthub.mapper.MinisterioMapper;
import br.com.daniel.contenthub.model.Ministerio;
import br.com.daniel.contenthub.repository.MinisterioRepository;

@Service
public class MinisterioService {

    @Autowired
    private MinisterioRepository ministerioRepository;

    // Lista todos os ministérios
    public List<MinisterioDTO> listarMinisterios() {

        return MinisterioMapper.toDTOList(
                ministerioRepository.findAll()
        );

    }

    // Busca entidade por ID
    public Ministerio buscarPorId(Long id) {

        return ministerioRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Ministério com ID " + id + " não encontrado."
                        )
                );

    }

    // Busca DTO por ID
    public MinisterioDTO buscarDTOPorId(Long id) {

        return MinisterioMapper.toDTO(
                buscarPorId(id)
        );

    }

    // Cadastra um ministério
    public Ministerio adicionarMinisterio(Ministerio ministerio) {

        return ministerioRepository.save(ministerio);

    }

    // Atualiza um ministério
    public Ministerio atualizarMinisterio(Long id, Ministerio ministerioAtualizado) {

        Ministerio ministerio = buscarPorId(id);

        ministerio.setNome(ministerioAtualizado.getNome());
        ministerio.setDescricao(ministerioAtualizado.getDescricao());
        ministerio.setLider(ministerioAtualizado.getLider());

        return ministerioRepository.save(ministerio);

    }

    // Remove um ministério
    public void removerMinisterio(Long id) {

        Ministerio ministerio = buscarPorId(id);

        ministerioRepository.delete(ministerio);

    }

    // Busca por nome
    public List<MinisterioDTO> buscarPorNome(String nome) {

        return MinisterioMapper.toDTOList(
                ministerioRepository.findByNomeContainingIgnoreCase(nome)
        );

    }

    // Busca por líder
    public List<MinisterioDTO> buscarPorLider(String lider) {

        return MinisterioMapper.toDTOList(
                ministerioRepository.findByLiderContainingIgnoreCase(lider)
        );

    }

}