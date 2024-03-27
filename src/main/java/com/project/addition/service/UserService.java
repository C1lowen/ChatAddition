package com.project.addition.service;

import com.project.addition.dto.RoomThematic;
import com.project.addition.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class UserService {

    private final Map<String, User> userMap = new ConcurrentHashMap<>();

    private final RedisTemplate<String, LocalDateTime> bannedId;

    private final ThematicChatService thematicChatService;
    public void save(String uniqueId, User user) {
        userMap.put(uniqueId, user);
    }

    public Optional<User> getUser(String uniqueId) {
        return Optional.ofNullable(userMap.get(uniqueId));
    }

    public void deleteUser(String userId) {
        userMap.remove(userId);
    }

    public Boolean setBannedId(String userId) {
        User user = userMap.get(userId);
        RoomThematic roomThematic = thematicChatService.getRoomThematic(user.getRoom().getChatId());
        String bannedUserId = "";
        if(roomThematic != null) {
            List<String> users = roomThematic.getUsers();
            if(users!= null && roomThematic.getUsers().size() < 2) return false;
            if(users != null) {
                bannedUserId = users.stream()
                        .filter(idUserRoom -> !userId.equals(idUserRoom))
                        .findFirst().get();
            }
        }else {
            bannedUserId = user.getRoom().getUserOneId().equals(userId) ? user.getRoom().getUserTwoId() : user.getRoom().getUserOneId();
        }
        bannedId.opsForValue().set(bannedUserId, LocalDateTime.now().plusDays(7L));
        return true;
    }

    public String isBanned(String userId) {
        LocalDateTime storedDateTime = bannedId.opsForValue().get(userId);

        if (storedDateTime != null) {
            if (LocalDateTime.now().isBefore(storedDateTime)) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                return storedDateTime.format(formatter);
            } else {
                bannedId.delete(userId);
            }
        }
        return "-1";
    }

}
