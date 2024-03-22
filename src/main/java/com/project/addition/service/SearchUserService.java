package com.project.addition.service;

import com.project.addition.dto.RoomDTO;
import com.project.addition.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchUserService {

    private final List<User> queue = Collections.synchronizedList(new ArrayList<>());

    private final RoomService roomService;

    private final UserService userService;

    public String addUserQueue(User user) {

        queue.removeIf(userQueue -> userQueue.getId().equals(user.getId()));

        Optional<User> userCompOptional = compareUser(user);

        if (userCompOptional.isPresent()) {
            User userComp = userCompOptional.get();

            String userId = user.getId();
            String userCompId = userComp.getId();

            String roomId = userId + userCompId;

            RoomDTO room = new RoomDTO(roomId, userId, userCompId);
            user.setRoom(room);
            userComp.setRoom(room);

            roomService.saveChatId(roomId, room);

            userService.save(userId, user);
            userService.save(userCompId, userComp);

            queue.removeAll(List.of(user, userComp));


            return roomId;
        } else {
            addToQueue(user);

            return null;
        }
    }

    private void removeFromQueue(User user) {
        queue.remove(user);
    }

    public void deleteQueueByUserId(String userId) {
        Optional<User> currentUser = queue.stream()
                .filter(user -> user.getId().equals(userId))
                .findFirst();

        currentUser.ifPresent(queue::remove);
    }

    public Boolean checkUserInSearch(String userId) {
        Optional<User> currentUser = queue.stream()
                .filter(user -> user.getId().equals(userId))
                .findFirst();

        return currentUser.isPresent();
    }

    private void addToQueue(User user) {
        queue.add(user);
    }

    public Optional<User> compareUser(User user) {
        return queue.stream()
                .filter(userQueue -> user.getTypeRoom() == userQueue.getTypeRoom()
                        && userQueue.getInfoUser().getCity().equals(user.getInfoUser().getCity())
                        && userQueue.getInfoUser().getCountry().equals(user.getInfoUser().getCountry())
                        && (user.getInfoUser().getSearchAge().contains(userQueue.getAge()) && userQueue.getInfoUser().getSearchAge().contains(user.getAge()))
                        && (user.getInfoUser().getSearchGender().contains(userQueue.getGender()) && userQueue.getInfoUser().getSearchGender().contains(user.getGender())))
                .findFirst();
    }
}
