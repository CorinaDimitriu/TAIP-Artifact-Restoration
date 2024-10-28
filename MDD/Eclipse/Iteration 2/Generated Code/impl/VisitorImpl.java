/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid.impl;

import com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Painting;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Visitor;

import java.util.Collection;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EClass;

import org.eclipse.emf.ecore.util.EObjectResolvingEList;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Visitor</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.VisitorImpl#getGallery <em>Gallery</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.VisitorImpl#getPainting <em>Painting</em>}</li>
 * </ul>
 *
 * @generated
 */
public class VisitorImpl extends UserImpl implements Visitor {
	/**
	 * The cached value of the '{@link #getGallery() <em>Gallery</em>}' reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGallery()
	 * @generated
	 * @ordered
	 */
	protected EList<Gallery> gallery;

	/**
	 * The cached value of the '{@link #getPainting() <em>Painting</em>}' reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getPainting()
	 * @generated
	 * @ordered
	 */
	protected EList<Painting> painting;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected VisitorImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return FillTheVoidPackage.Literals.VISITOR;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EList<Gallery> getGallery() {
		if (gallery == null) {
			gallery = new EObjectResolvingEList<Gallery>(Gallery.class, this, FillTheVoidPackage.VISITOR__GALLERY);
		}
		return gallery;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EList<Painting> getPainting() {
		if (painting == null) {
			painting = new EObjectResolvingEList<Painting>(Painting.class, this, FillTheVoidPackage.VISITOR__PAINTING);
		}
		return painting;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
		case FillTheVoidPackage.VISITOR__GALLERY:
			return getGallery();
		case FillTheVoidPackage.VISITOR__PAINTING:
			return getPainting();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
		case FillTheVoidPackage.VISITOR__GALLERY:
			getGallery().clear();
			getGallery().addAll((Collection<? extends Gallery>) newValue);
			return;
		case FillTheVoidPackage.VISITOR__PAINTING:
			getPainting().clear();
			getPainting().addAll((Collection<? extends Painting>) newValue);
			return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
		case FillTheVoidPackage.VISITOR__GALLERY:
			getGallery().clear();
			return;
		case FillTheVoidPackage.VISITOR__PAINTING:
			getPainting().clear();
			return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
		case FillTheVoidPackage.VISITOR__GALLERY:
			return gallery != null && !gallery.isEmpty();
		case FillTheVoidPackage.VISITOR__PAINTING:
			return painting != null && !painting.isEmpty();
		}
		return super.eIsSet(featureID);
	}

} //VisitorImpl
