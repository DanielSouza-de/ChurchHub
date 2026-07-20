package br.com.daniel.contenthub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.daniel.contenthub.model.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByTituloContainingIgnoreCase(String titulo);

    List<Evento> findByDescricaoContainingIgnoreCase(String descricao);
    
    List<Evento> findByData(String data);
    

}