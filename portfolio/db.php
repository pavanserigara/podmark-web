<?php
// JSON Database Helper
// Replaces SQLite/MySQL to work on ANY PHP setup (even without drivers)

class JsonDB
{
     private $file;
     private $data;

     public function __construct($filename = 'data.json')
     {
          $this->file = __DIR__ . '/' . $filename;
          if (!file_exists($this->file)) {
               // Initialize with empty structure
               $this->data = [
                    'clients' => [],
                    'categories' => [],
                    'media' => [],
                    'updates' => []
               ];
               $this->save();
          } else {
               $this->data = json_decode(file_get_contents($this->file), true);
          }
     }

     private function save()
     {
          file_put_contents($this->file, json_encode($this->data, JSON_PRETTY_PRINT));
     }

     // --- GENERIC ID GENERATOR ---
     private function nextId($table)
     {
          if (empty($this->data[$table]))
               return 1;
          $max = 0;
          foreach ($this->data[$table] as $item) {
               if ($item['id'] > $max)
                    $max = $item['id'];
          }
          return $max + 1;
     }

     // --- CLIENTS ---
     public function getClients()
     {
          // Sort by id desc (newest first)
          $c = $this->data['clients'];
          usort($c, function ($a, $b) {
               return $b['id'] - $a['id'];
          });
          return $c;
     }

     public function addClient($name, $desc, $logo_url = '')
     {
          $new = [
               'id' => $this->nextId('clients'),
               'name' => $name,
               'description' => $desc,
               'logo' => $logo_url,
               'created_at' => date('Y-m-d H:i:s')
          ];
          $this->data['clients'][] = $new;
          $this->save();
          return $new;
     }

     // --- CATEGORIES ---
     public function getCategories($client_id = null)
     {
          if ($client_id === null)
               return $this->data['categories'];

          return array_filter($this->data['categories'], function ($c) use ($client_id) {
               return $c['client_id'] == $client_id;
          });
     }

     public function addCategory($client_id, $name)
     {
          $new = [
               'id' => $this->nextId('categories'),
               'client_id' => (int) $client_id,
               'name' => $name
          ];
          $this->data['categories'][] = $new;
          $this->save();
          return $new;
     }

     // --- MEDIA ---
     public function getMedia($category_id)
     {
          $m = array_filter($this->data['media'], function ($item) use ($category_id) {
               return $item['category_id'] == $category_id;
          });
          // Reset keys
          return array_values($m);
     }

     public function addMedia($category_id, $file_path, $type, $title = '', $link = '', $desc = '')
     {
          $new = [
               'id' => $this->nextId('media'),
               'category_id' => (int) $category_id,
               'file_path' => $file_path,
               'media_type' => $type,
               'title' => $title,
               'link' => $link,
               'description' => $desc,
               'created_at' => date('Y-m-d H:i:s')
          ];
          $this->data['media'][] = $new;
          $this->save();
          return $new;
     }

     // --- UPDATES ---
     public function getUpdates()
     {
          $u = $this->data['updates'];
          usort($u, function ($a, $b) {
               return strtotime($b['created_at']) - strtotime($a['created_at']);
          });
          return $u;
     }

     public function addUpdate($title, $content)
     {
          $new = [
               'id' => $this->nextId('updates'),
               'title' => $title,
               'content' => $content,
               'created_at' => date('Y-m-d H:i:s')
          ];
          $this->data['updates'][] = $new;
          $this->save();
          return $new;
     }

     public function deleteUpdate($id)
     {
          $id = (int) $id;
          $this->data['updates'] = array_values(array_filter($this->data['updates'], function ($u) use ($id) {
               return $u['id'] != $id;
          }));
          $this->save();
     }

     // --- DELETE METHODS ---
     public function deleteClient($id)
     {
          // Remove client
          $this->data['clients'] = array_values(array_filter($this->data['clients'], function ($c) use ($id) {
               return $c['id'] != $id;
          }));

          // Find categories to delete
          $cats_to_delete = [];
          $this->data['categories'] = array_values(array_filter($this->data['categories'], function ($c) use ($id, &$cats_to_delete) {
               if ($c['client_id'] == $id) {
                    $cats_to_delete[] = $c['id'];
                    return false;
               }
               return true;
          }));

          // Remove associated media
          $this->data['media'] = array_values(array_filter($this->data['media'], function ($m) use ($cats_to_delete) {
               if (in_array($m['category_id'], $cats_to_delete)) {
                    if (file_exists(__DIR__ . '/' . $m['file_path'])) {
                         @unlink(__DIR__ . '/' . $m['file_path']);
                    }
                    return false;
               }
               return true;
          }));

          $this->save();
     }

     public function deleteMedia($id)
     {
          $id = (int) $id;
          $this->data['media'] = array_values(array_filter($this->data['media'], function ($m) use ($id) {
               if ($m['id'] == $id) {
                    if (file_exists(__DIR__ . '/' . $m['file_path'])) {
                         @unlink(__DIR__ . '/' . $m['file_path']);
                    }
                    return false;
               }
               return true;
          }));
          $this->save();
     }

     public function deleteCategory($id)
     {
          $id = (int) $id;
          // Remove category
          $this->data['categories'] = array_values(array_filter($this->data['categories'], function ($c) use ($id) {
               return $c['id'] != $id;
          }));

          // Remove associated media
          $this->data['media'] = array_values(array_filter($this->data['media'], function ($m) use ($id) {
               if ($m['category_id'] == $id) {
                    if (file_exists(__DIR__ . '/' . $m['file_path'])) {
                         @unlink(__DIR__ . '/' . $m['file_path']);
                    }
                    return false;
               }
               return true;
          }));
          $this->save();
     }

     public function editClient($id, $name, $desc)
     {
          $id = (int) $id;
          foreach ($this->data['clients'] as &$c) {
               if ($c['id'] == $id) {
                    $c['name'] = $name;
                    $c['description'] = $desc;
                    break;
               }
          }
          $this->save();
     }

     public function editCategory($id, $name)
     {
          $id = (int) $id;
          foreach ($this->data['categories'] as &$c) {
               if ($c['id'] == $id) {
                    $c['name'] = $name;
                    break;
               }
          }
          $this->save();
     }

     // --- Helper to get full tree for frontend ---
     public function getFullPortfolio()
     {
          $clients = $this->getClients();
          foreach ($clients as &$client) {
               $client['categories'] = $this->getCategories($client['id']);
               foreach ($client['categories'] as &$cat) {
                    $cat['media'] = $this->getMedia($cat['id']);
               }
          }
          return $clients;
     }
}

// Global instance
$db = new JsonDB();
?>