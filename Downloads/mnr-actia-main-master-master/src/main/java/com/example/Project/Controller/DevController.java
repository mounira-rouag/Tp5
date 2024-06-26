package com.example.Project.Controller;

import com.example.Project.Models.*;
import com.example.Project.Repositories.*;
import com.example.Project.Services.CDCServiceImpl;
import com.example.Project.Services.DevServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")

@RestController
@RequestMapping("/api")
public class DevController {
    final private DevRepository devRepo;
    private final DevServiceImpl devServiceImpl;
    private final CDCServiceImpl cdcServiceImpl;
    private final UserInterface userRepo;
    private final VehiculeRepository vehiculeRepository;
    private final SitesRepository siteRepo;
private final MajRepository majRepo;

    public DevController(DevRepository devRepo, DevServiceImpl devServiceImpl, CDCServiceImpl cdcServiceImpl, SitesRepository siteRepo, CDCRepository cdcRepo, UserInterface userRepo, VehiculeRepository vehiculeRepository, SitesRepository siteRepo1, MajRepository majRepo) {
        this.devRepo = devRepo;
        this.devServiceImpl = devServiceImpl;
        this.cdcServiceImpl = cdcServiceImpl;
        this.userRepo = userRepo;
        this.vehiculeRepository = vehiculeRepository;
        this.siteRepo = siteRepo1;

        this.majRepo = majRepo;
    }


    @GetMapping("/all-names")
    public List<Dev> getAllMarqueNames() {
        return devServiceImpl.getAllDev();
    }

    @PostMapping("dev/create")
    public Dev createDev(@RequestBody Dev dev){

        return devRepo.save(dev);
    }
    @GetMapping("/dev/all")
    public List<Dev> getAllDevs() {
        return devRepo.findAll();
    }

    @GetMapping("/dev/{id}")
    public Optional<Dev> findDevById(@PathVariable int id) {
        return devServiceImpl.findById(id);
    }

    @GetMapping("/dev/by-cdc/{id}")
    public List<Dev> findDevByCDC(@PathVariable int id) {
        return devServiceImpl.getDevByCdcId(id);
    }
    @GetMapping("dev/dll-id")
    public List<Dev> getDevByDll(@RequestParam String dll){
        return devRepo.findByDll(dll);
    }

    @GetMapping("/dev/maj-version/{idMaj}")
    public List<Dev> getDevByMaj(@PathVariable int idMaj){
        Maj maj=majRepo.getById(idMaj);
        return devServiceImpl.getDevByMaj(maj);
    }
    /**
    @GetMapping("/dev/site-id/{idSite}")
    public List <Dev> getDevBySite(@PathVariable int idSite){
        Optional<Sites> site =siteRepo.findById(idSite);
        Optional<User> user=userRepo.findBySite(site);

    }*/
    @GetMapping("/dev/user/{iduser}")
    public List<Dev> getDevByUser(@PathVariable int iduser){
      User user =userRepo.getById(iduser);
      return  devRepo.getByUser(user);

    }
    @GetMapping("/dev/veh-model/{vehcode}")
    public List<Dev> getDevByModel(@PathVariable int vehcode){
        Vehicule vehicule=vehiculeRepository.findByCodeVeh(vehcode);
        return devRepo.findByVehicules(vehicule);



    }

    }