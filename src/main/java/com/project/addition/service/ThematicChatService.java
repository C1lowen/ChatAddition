package com.project.addition.service;

import com.project.addition.dto.RoomThematic;
import com.project.addition.dto.TypeRoom;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ThematicChatService {

    private final Map<String, RoomThematic> roomThematics = new ConcurrentHashMap<>();

    private final static Integer COUNT_USERS_ROOM = 2;

    private final static Integer DOWNTIME_ROOM = 1;

    @Transactional
    public void saveRoom(RoomThematic roomThematic) {
        roomThematic.setUsers(new ArrayList<>());
        roomThematics.put(roomThematic.getChatId(), roomThematic);
    }
    @Transactional
    public List<RoomThematic> getAllRoomThematic(TypeRoom typeRoom) {
        return roomThematics.values().stream()
                .filter(room -> room.getTypeRoom() == typeRoom
                        && room.getDateTime().until(LocalDateTime.now(), ChronoUnit.MINUTES) < DOWNTIME_ROOM
                        && room.getUsers().size() < COUNT_USERS_ROOM )
                .toList();
    }

    @Transactional
    public List<String> getOverdueThematicChat() {
        List<String> listOverdue =  roomThematics.values().stream()
                .filter(room -> room.getDateTime().until(LocalDateTime.now(), ChronoUnit.MINUTES) >= DOWNTIME_ROOM
                        && room.getUsers().isEmpty())
                .map(RoomThematic::getChatId)
                .toList();

        listOverdue.forEach(roomThematics::remove);

        return listOverdue;
    }

    public RoomThematic getRoomThematic(String uniqueId) {
        return roomThematics.get(uniqueId);
    }

    public void deleteUserId(String userId, String chatId) {
         RoomThematic roomThematic = roomThematics.get(chatId);
         if(roomThematic != null) {
             roomThematic.getUsers().remove(userId);
         }
    }

    public void setRoomThematics(String uniqueId, RoomThematic roomThematic) {
        roomThematics.put(uniqueId, roomThematic);
    }

}
