package com.project.addition.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ChatCleanupService {
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final ThematicChatService thematicChatService;
    private final SimpMessagingTemplate simpMessagingTemplate;


    public void startCleanupTask() {
        scheduler.scheduleAtFixedRate(this::cleanupChats, 0, 10, TimeUnit.SECONDS);
    }

    private void cleanupChats() {
        List<String> overdueChats = thematicChatService.getOverdueThematicChat();
        if(!overdueChats.isEmpty()) {
            getOverdueThematicChat(overdueChats);
        }
    }


    public void getOverdueThematicChat(List<String> listRoom) {
        simpMessagingTemplate.convertAndSend("/user/all/thematicRoom/delete", listRoom);
    }

    public void shutdown() {
        scheduler.shutdown();
    }
}
