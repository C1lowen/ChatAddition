package com.project.addition.controller;

import com.project.addition.dto.Message;
import com.project.addition.dto.User;
import com.project.addition.model.Room;
import com.project.addition.service.RoomService;
import com.project.addition.service.SearchUserService;
import com.project.addition.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping("/user/check/search/{userId}")
    public Boolean checkUserInSearch(@PathVariable String userId) {
        return searchUserService.checkUserInSearch(userId);
    }

    @DeleteMapping("/user/delete/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userService.getUser(userId).ifPresent(user -> {
            roomService.deleteChatId(user.getRoom().getChatId());
            userService.deleteUser(userId);
        });
    }

    @GetMapping("/user/active/{userId}/{chatId}")
    public Boolean checkActiveUser(@PathVariable String userId, @PathVariable String chatId) {
        return roomService.findUserByChatId(chatId, userId);
    }

//    @GetMapping("/chat/active/{userId}")
//    public Boolean chatActiveCheck(@PathVariable String userId) {
//        return userService.checkActiveChat(userId);
//    }

    @DeleteMapping("/user/delete/queue/{userId}")
    public void deleteUserByQueue(@PathVariable String userId) {
        searchUserService.deleteQueueByUserId(userId);
    }

    @GetMapping("/user/check/room/{userId}")
    public Boolean checkRoomUser(@PathVariable String userId) {
        Optional<User> userOptional = userService.getUser(userId);
         if(userOptional.isPresent()) {
             User user = userOptional.get();
             if(user.getRoom() != null) {
                 return true;
             }
         };
         return false;
    }

    @GetMapping("/user/check/banned/{userId}")
    public Long checkBanned(@PathVariable String userId) {
        return userService.isBanned(userId);
    }

    @PostMapping("/user/set/banned")
    public void setBannedUser(@RequestBody String userId) {
        userService.setBannedId(userId);
    }

//    @PostMapping("/save/redis")
//    public void redisSave(@RequestBody Room room) {
//        roomService.saveMessage(room);
//    }

//    @GetMapping("/get/message/{id}")
//    public List<Message> redisGet(@PathVariable String id) {
//        return roomService.getMessage(id);
//    }

//    @GetMapping("/gett/redis/{id}")
//    public List<Room> redisGet2(@PathVariable String id) {
//       return roomService.getMessageList(id);
//    }
}

