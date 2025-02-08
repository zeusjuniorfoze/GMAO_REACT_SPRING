package GMAO.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import GMAO.model.User;
import GMAO.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")  // <--- Ajoute ce préfixe
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}
