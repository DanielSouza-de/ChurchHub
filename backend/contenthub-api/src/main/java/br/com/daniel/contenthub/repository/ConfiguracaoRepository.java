package br.com.daniel.contenthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.daniel.contenthub.model.Configuracao;

@Repository
public interface ConfiguracaoRepository
        extends JpaRepository<Configuracao, Long> {
}