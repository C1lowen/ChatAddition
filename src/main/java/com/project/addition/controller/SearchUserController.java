package com.project.addition.controller;

import com.project.addition.dto.User;
import com.project.addition.service.SearchUserService;
import com.project.addition.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class SearchUserController {

    private final SearchUserService searchUserService;
    private final UserService userService;

    @PostMapping("/user/add/queue")
    public String addUserQueue(@RequestBody User user) {
        return searchUserService.addUserQueue(user);
    }

    @GetMapping("/user/chat/{id}")
    public String getUserIdChat(@PathVariable String id) {
        User user = userService.getUser(id);
        return user.getRoom().getChatId();
    }

    @DeleteMapping("/user/delete/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
    }
}
