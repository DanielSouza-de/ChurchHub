package br.com.daniel.contenthub.dto;

public class ConfiguracaoDTO {

    private Long id;
    private String nomeIgreja;
    private String slogan;
    private String nomePastor;
    private String textoApresentacao;
    private String endereco;
    private String telefone;
    private String whatsapp;
    private String email;
    private String instagram;
    private String facebook;
    private String youtube;
    private String logo;
    private String banner;
    private String fotoPastor;

    public ConfiguracaoDTO() {
    }

    public ConfiguracaoDTO(
            Long id,
            String nomeIgreja,
            String slogan,
            String nomePastor,
            String fotoPastor,
            String textoApresentacao,
            String endereco,
            String telefone,
            String whatsapp,
            String email,
            String instagram,
            String facebook,
            String youtube,
            String logo,
            String banner) {

        this.id = id;
        this.nomeIgreja = nomeIgreja;
        this.slogan = slogan;
        this.nomePastor = nomePastor;
        this.fotoPastor = fotoPastor;
        this.textoApresentacao = textoApresentacao;
        this.endereco = endereco;
        this.telefone = telefone;
        this.whatsapp = whatsapp;
        this.email = email;
        this.instagram = instagram;
        this.facebook = facebook;
        this.youtube = youtube;
        this.logo = logo;
        this.banner = banner;
    }

    public Long getId() {
        return id;
    }

    public String getNomeIgreja() {
        return nomeIgreja;
    }

    public void setNomeIgreja(String nomeIgreja) {
        this.nomeIgreja = nomeIgreja;
    }

    public String getSlogan() {
        return slogan;
    }

    public void setSlogan(String slogan) {
        this.slogan = slogan;
    }

    public String getNomePastor() {
        return nomePastor;
    }

    public void setNomePastor(String nomePastor) {
        this.nomePastor = nomePastor;
    }

    public String getTextoApresentacao() {
        return textoApresentacao;
    }

    public void setTextoApresentacao(String textoApresentacao) {
        this.textoApresentacao = textoApresentacao;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getYoutube() {
        return youtube;
    }

    public void setYoutube(String youtube) {
        this.youtube = youtube;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }
    
    public String getFotoPastor() {
        return fotoPastor;
    }

    public void setFotoPastor(String fotoPastor) {
        this.fotoPastor = fotoPastor;
    }
}