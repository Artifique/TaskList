$(document).ready(function(){
  // Chargement des tâches sauvegardées au chargement de la page
  loadTasks(); 

  $("#ajout").click(function(){
      // Fonctionnalité pour ajouter une nouvelle tâche
      var name = $("#nom").val();
      var date = $("#date").val();
      var priorite = $("#priorite").val();
      var statut = $("#statut").val();

      // Ajout d'une nouvelle ligne avec les détails de la tâche
      $(".table tbody").append(
          '<tr>' +
              '<td><input type="checkbox" class="select-elmt"></td>' +
              '<td>' + name + '</td>' +
              '<td>' + date + '</td>' +
              '<td>' + priorite + '</td>' +
              '<td><span class="status inProgress">'+ statut +'</span></td>' +
          '</tr>'
      );

      // Sauvegarde des tâches dans le stockage local
      saveTasks();
  });

  // Sélection de toutes les checkbox
  $("#select-all").click(function(){
      var isSelected = $(this).is(":checked");
      $(".table tbody tr").each(function(){
          $(this).find('input[type="checkbox"]').prop('checked', isSelected);
      });
  });

  // Suppression d'une tâche
  $("#sup").click(function(){
      $(".table tbody tr").each(function(){
          var isChecked = $(this).find('input[type="checkbox"]').is(":checked");
          if(isChecked){
              $(this).remove();
          }
      });
      // Sauvegarde des tâches dans le stockage local après suppression
      saveTasks();
  });

  // Fonction pour charger les tâches sauvegardées
  function loadTasks() {
      var savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
          $(".table tbody").append(savedTasks);
      }
  }

  // Fonction pour sauvegarder les tâches dans le stockage local
  function saveTasks() {
      var tasksHTML = $(".table tbody").html();
      localStorage.setItem('tasks', tasksHTML);
  }

  // Compter le nombre de tâches en cours
  function countEncourTasks() {
    var EncourTasksCount = 0;
    $(".table tbody tr").each(function(){
        var statut = $(this).find('td:eq(4)').text();
        if (statut.trim().toLowerCase() === "en cour") {
          EncourTasksCount++;
        }
    });
    return EncourTasksCount;
  }

  // Utilisation de la fonction pour obtenir le nombre total de tâches
  var nbTachesEncour = countEncourTasks();
  console.log("Nombre de tâches en cours : " + nbTachesEncour);

  // Fonction pour compter le nombre total de tâches
  function countTotalTasks() {
    var TotalTasksCount = 0;
    $(".table tbody tr").each(function(){
      TotalTasksCount++;
    });
    return TotalTasksCount;
  }

  // Utilisation de la fonction pour obtenir le nombre total de tâches
  var nbTachesTotal = countTotalTasks();
  console.log("Nombre total de tâches : " + nbTachesTotal);

  // Fonction pour changer le statut en fonction de la case à cocher
  $(".table").on("change", ".select-elmt", function() {
      var isChecked = $(this).is(":checked");
      var row = $(this).closest("tr");
      var statutCell = row.find("td:eq(4)");
      
      if (isChecked) {
        statutCell.html('<span class="status delivered">Terminé</span>');
      } else {
        statutCell.html('<span class="status inProgress">En cour</span>');
      }
    
      // Sauvegarde des tâches après modification du statut
      saveTasks();
    });
});
