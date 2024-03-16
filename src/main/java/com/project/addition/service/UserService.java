package com.project.addition.service;

import com.project.addition.dto.Room;
import com.project.addition.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class UserService {

    private final Map<String, User> userMap = new HashMap<>();


    public void save(String uniqueId, User user) {
        userMap.put(uniqueId, user);
    }

    public User getUser(String uniqueId) {
        return userMap.get(uniqueId);
    }

    public void deleteUser(String userId) {
        userMap.remove(userId);
    }
}
