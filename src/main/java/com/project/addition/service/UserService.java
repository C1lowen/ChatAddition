package com.project.addition.service;

import com.project.addition.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class UserService {

    private final Map<String, User> userMap = new ConcurrentHashMap<>();

    private final RedisTemplate<String, LocalDateTime> bannedId;

    public void save(String uniqueId, User user) {
        userMap.put(uniqueId, user);
    }

    public Optional<User> getUser(String uniqueId) {
        return Optional.ofNullable(userMap.get(uniqueId));
    }

    public void deleteUser(String userId) {
        userMap.remove(userId);
    }

    public void setBannedId(String userId) {
        User user = userMap.get(userId);
        String bannedUserId = user.getRoom().getUserOneId().equals(userId) ? user.getRoom().getUserTwoId() : user.getRoom().getUserOneId();
        bannedId.opsForValue().set(bannedUserId, LocalDateTime.now());
    }

    public Long isBanned(String userId) {
        LocalDateTime storedDateTime = bannedId.opsForValue().get(userId);
        LocalDateTime currentDateTime = LocalDateTime.now();

        if (storedDateTime != null) {
            long minutesElapsed = storedDateTime.until(currentDateTime, ChronoUnit.MINUTES);

            if (minutesElapsed < 30) {
                return 30 - minutesElapsed;
            } else {
                bannedId.delete(userId);
            }
        }
        return -1L;
    }

}
