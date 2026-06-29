<?php

namespace App\Controllers;

use App\Models\NoteModel;

class Note extends BaseController
{
    public function index()
    {
        return view('notes');
    }

    public function getNotes()
    {
        $model = new NoteModel();
        return $this->response->setJSON($model->findAll());
    }

    public function create()
    {
        $model = new NoteModel();
        $data = $this->request->getJSON(true);

        $id = $model->insert([
            'title'   => $data['title'],
            'content' => $data['content']
        ]);

        return $this->response->setJSON([
            'id' => $id
        ]);
    }

    public function delete($id)
    {
        $model = new NoteModel();
        $model->delete($id);

        return $this->response->setJSON(['status' => 'deleted']);
    }

    public function update($id)
    {
        $model = new NoteModel();
        $data = $this->request->getJSON(true);

        $model->update($id, [
            'title'   => $data['title'],
            'content' => $data['content']
        ]);

        return $this->response->setJSON(['status' => 'updated']);
    }
}