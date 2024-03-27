package com.project.addition.controller;

import com.project.addition.dto.TypeRoom;
import com.project.addition.dto.User;
import com.project.addition.service.RoomService;
import com.project.addition.service.ThematicChatService;
import com.project.addition.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class MainController {

    private final ThematicChatService thematicChatService;

    @GetMapping("/")
    public String homePage(HttpServletRequest request) {
        String session = request.getSession().getId();
        return "index.html";
    }

    @GetMapping("/videoconference")
    public String videoconferencePage() {
        return "videoForm";
    }

    @GetMapping("/voicechat")
    public String voicechatPage() {
        return "voiceForm";
    }

    @GetMapping("/voicechat/adult")
    public String voicechatAdultPage() {
        return "adultForm";
    }

    @GetMapping("/textchat")
    public String textchatPage() {
        return "chat";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "registerForm";
    }

    @GetMapping("/form/thematic")
    public String formThematicPage(Model model) {
        model.addAttribute("allThematicRoom", thematicChatService.getAllRoomThematic(TypeRoom.THEMATIC));
        return "thematicRegularForm";
    }

    @GetMapping("/form/thematic/adult")
    public String formThematicAdultPage(Model model) {
        model.addAttribute("allThematic18Room", thematicChatService.getAllRoomThematic(TypeRoom.THEMATIC18));
        return "thematicAdultForm";
    }

    @GetMapping("/form/regular")
    public String formRegularPage() {
        return "regularForm";
    }


}
