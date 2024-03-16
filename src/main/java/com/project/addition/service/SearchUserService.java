package com.project.addition.service;

import com.project.addition.dto.Room;
import com.project.addition.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SearchUserService {

    private final List<User> queue = new ArrayList<>();

    private final UserService userService;

    public String addUserQueue(User user) {
        Optional<User> userCompOptional = compareUser(user);
        if (userCompOptional.isPresent()) {
            User userComp = userCompOptional.get();

            String userId = user.getId();
            String userCompId = userComp.getId();

            String roomId = userId + userCompId;

            user.setRoomId(roomId);
            userComp.setRoomId(roomId);

            user.setRecipientId(userCompId);
            userComp.setRecipientId(userId);

            userService.save(userId, user);
            userService.save(userCompId, userComp);

            queue.removeAll(List.of(user, userComp));

            return userCompId;
        } else {
            queue.removeIf(userQueue -> userQueue.getId().equals(user.getId()));

            addToQueue(user);

            return null;
        }
    }

    private void removeFromQueue(User user) {
        queue.remove(user);
    }

    private void addToQueue(User user) {
        queue.add(user);
    }

    public Optional<User> compareUser(User user) {
        return queue.stream()
                .filter(userQueue -> userQueue.getInfoUser().getCity().equals(user.getInfoUser().getCity()))
                .filter(userQueue -> userQueue.getInfoUser().getCountry().equals(user.getInfoUser().getCountry()))
                .filter(userQueue -> user.getInfoUser().getSearchAge().contains(userQueue.getAge()) && userQueue.getInfoUser().getSearchAge().contains(user.getAge()))
                .filter(userQueue -> user.getInfoUser().getSearchGender().contains(userQueue.getGender()) && userQueue.getInfoUser().getSearchGender().contains(user.getGender()))
                .findFirst();
    }
}
