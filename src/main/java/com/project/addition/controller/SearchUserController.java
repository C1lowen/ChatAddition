package com.project.addition.controller;

import com.project.addition.dto.User;
import com.project.addition.service.RoomService;
import com.project.addition.service.SearchUserService;
import com.project.addition.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class SearchUserController {

    private final SearchUserService searchUserService;
    private final UserService userService;
    private final RoomService roomService;

    @PostMapping("/user/add/queue")
    public String addUserQueue(@RequestBody User user) {
        return searchUserService.addUserQueue(user);
    }

    @GetMapping("/user/chat/{id}")
    public String getUserIdChat(@PathVariable String id) {
        String chatId = "";
        Optional<User> optionalUser = userService.getUser(id);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            chatId = user.getRoom().getChatId();
        }

        return chatId;
    }

    @DeleteMapping("/user/delete/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userService.getUser(userId).ifPresent(user -> {
            roomService.deleteChatId(user.getRoom().getChatId());
            userService.deleteUser(userId);
        });
    }

    @GetMapping("/chat/active/{userId}")
    public Boolean chatActiveCheck(@PathVariable String userId) {
        return userService.checkActiveChat(userId);
    }

    @DeleteMapping("/user/delete/queue/{userId}")
    public void deleteUserByQueue(@PathVariable String userId) {
        userService.deleteUser(userId);
    }
}

