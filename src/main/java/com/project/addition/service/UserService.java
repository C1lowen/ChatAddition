package com.project.addition.service;

import com.project.addition.dto.Room;
import com.project.addition.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final Map<String, User> userMap = new HashMap<>();

    private final RoomService roomService;

    public void save(String uniqueId, User user) {
        userMap.put(uniqueId, user);
    }

    public Optional<User> getUser(String uniqueId) {
        return Optional.ofNullable(userMap.get(uniqueId));
    }

    public void deleteUser(String userId) {
        userMap.remove(userId);
    }

    public Boolean checkActiveChat(String userId) {
        Boolean result = false;
        Optional<User> optionalUser = getUser(userId);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            result = roomService.findChat(user.getRoom().getChatId());
            if (!result) {
                roomService.deleteChatId(user.getRoom().getChatId());
                deleteUser(userId);
            }
        }
        return result;
    }
}
