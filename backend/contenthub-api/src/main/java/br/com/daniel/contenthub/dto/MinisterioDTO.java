package br.com.daniel.contenthub.dto;

public class MinisterioDTO {

    private Long id;
    private String nome;
    private String descricao;
    private String lider;

    public MinisterioDTO() {
    }

    public MinisterioDTO(Long id, String nome, String descricao, String lider) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.lider = lider;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getLider() {
        return lider;
    }

    public void setLider(String lider) {
        this.lider = lider;
    }
}