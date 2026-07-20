package br.com.daniel.contenthub.dto;

public class EventoDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String data;
    private String imagem;
    private Long ministerioId;
    private String ministerioNome;

    public EventoDTO() {
    }

    public EventoDTO(
            Long id,
            String titulo,
            String descricao,
            String data,
            String imagem,
            Long ministerioId,
            String ministerioNome) {

        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.imagem = imagem;
        this.ministerioId = ministerioId;
        this.ministerioNome = ministerioNome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public Long getMinisterioId() {
        return ministerioId;
    }

    public void setMinisterioId(Long ministerioId) {
        this.ministerioId = ministerioId;
    }

    public String getMinisterioNome() {
        return ministerioNome;
    }

    public void setMinisterioNome(String ministerioNome) {
        this.ministerioNome = ministerioNome;
    }
}