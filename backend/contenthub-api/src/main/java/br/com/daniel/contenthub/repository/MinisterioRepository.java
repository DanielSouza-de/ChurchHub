package br.com.daniel.contenthub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.daniel.contenthub.model.Ministerio;

public interface MinisterioRepository extends JpaRepository<Ministerio, Long> {

    List<Ministerio> findByNomeContainingIgnoreCase(String nome);

    List<Ministerio> findByLiderContainingIgnoreCase(String lider);

}