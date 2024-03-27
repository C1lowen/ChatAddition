package com.project.addition.component;

import com.project.addition.service.ChatCleanupService;
import com.project.addition.service.ThematicChatService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StartupInitializer {

    private final ChatCleanupService chatCleanupService;

    @Autowired
    public StartupInitializer(ChatCleanupService chatCleanupService) {
        this.chatCleanupService = chatCleanupService;
    }

    @PostConstruct
    public void init() {
        chatCleanupService.startCleanupTask();
    }

    @PreDestroy
    public void shutdown() {
        chatCleanupService.shutdown();
    }
}
