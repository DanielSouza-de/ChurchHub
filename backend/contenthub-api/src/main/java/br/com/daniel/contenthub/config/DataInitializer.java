package br.com.daniel.contenthub.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.com.daniel.contenthub.model.Usuario;
import br.com.daniel.contenthub.repository.UsuarioRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (usuarioRepository.findByEmail("admin@contenthub.com").isEmpty()) {

                Usuario admin = new Usuario();

                admin.setNome("Administrador");
                admin.setEmail("admin@contenthub.com");
                admin.setSenha(passwordEncoder.encode("123456"));
                admin.setRole("ADMIN");

                usuarioRepository.save(admin);

                System.out.println("=====================================");
                System.out.println("ADMINISTRADOR CRIADO");
                System.out.println("Email: admin@contenthub.com");
                System.out.println("Senha: 123456");
                System.out.println("=====================================");
            }

        };
    }
}